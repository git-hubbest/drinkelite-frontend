import { toast } from "sonner";

const SHOPIFY_API_VERSION = '2025-07';
// TODO: swap to elite-dev-v2.myshopify.com + new token once store is on paid plan
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'elite-elevate-store-r08bn.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '5b997a07edddd6e974a41bd08da43b32';

export interface SellingPlan {
  id: string;
  name: string;
  description: string | null;
  priceAdjustments: Array<{
    adjustmentValue: {
      __typename: string;
      adjustmentPercentage?: number;
      adjustmentAmount?: { amount: string; currencyCode: string };
      price?: { amount: string; currencyCode: string };
    };
  }>;
  recurringDeliveries: boolean;
}

export interface SellingPlanGroup {
  name: string;
  sellingPlans: {
    edges: Array<{ node: SellingPlan }>;
  };
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
    sellingPlanGroups?: {
      edges: Array<{ node: SellingPlanGroup }>;
    };
  };
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      'Shopify-Storefront-Private-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Your store needs to be upgraded to a paid plan.",
    });
    return;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Shopify error: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }
  return data;
}

// Products query WITHOUT selling plans (always works)
export const STOREFRONT_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

export const STOREFRONT_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

// Separate selling plans query — fails gracefully if scope not available
export const SELLING_PLANS_BY_HANDLE_QUERY = `
  query GetSellingPlans($handle: String!) {
    productByHandle(handle: $handle) {
      sellingPlanGroups(first: 10) {
        edges {
          node {
            name
            sellingPlans(first: 10) {
              edges {
                node {
                  id
                  name
                  description
                  recurringDeliveries
                  priceAdjustments {
                    adjustmentValue {
                      __typename
                      ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                      }
                      ... on SellingPlanFixedAmountPriceAdjustment {
                        adjustmentAmount { amount currencyCode }
                      }
                      ... on SellingPlanFixedPriceAdjustment {
                        price { amount currencyCode }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/** Fetch selling plans for a product, returns null if scope not available */
export async function fetchSellingPlans(handle: string): Promise<SellingPlanGroup[] | null> {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query: SELLING_PLANS_BY_HANDLE_QUERY, variables: { handle } }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    // If there are access errors, return null gracefully
    if (data.errors) {
      console.warn('Selling plans not available:', data.errors[0]?.message);
      return null;
    }
    const groups = data?.data?.productByHandle?.sellingPlanGroups?.edges;
    if (!groups?.length) return null;
    return groups.map((g: { node: SellingPlanGroup }) => g.node);
  } catch {
    console.warn('Failed to fetch selling plans');
    return null;
  }
}

// Cart mutations
export const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export const CART_DISCOUNT_CODES_UPDATE_MUTATION = `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart { id }
      userErrors { field message }
    }
  }
`;

/** Calculate the subscription price given a base price and a selling plan */
export function getSubscriptionPrice(basePrice: number, sellingPlan: SellingPlan): number {
  const adj = sellingPlan.priceAdjustments?.[0]?.adjustmentValue;
  if (!adj) return basePrice;
  if (adj.__typename === 'SellingPlanPercentagePriceAdjustment' && adj.adjustmentPercentage) {
    return +(basePrice * (1 - adj.adjustmentPercentage / 100)).toFixed(2);
  }
  if (adj.__typename === 'SellingPlanFixedAmountPriceAdjustment' && adj.adjustmentAmount) {
    return +(basePrice - parseFloat(adj.adjustmentAmount.amount)).toFixed(2);
  }
  if (adj.__typename === 'SellingPlanFixedPriceAdjustment' && adj.price) {
    return +parseFloat(adj.price.amount).toFixed(2);
  }
  return basePrice;
}
