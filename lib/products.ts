export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  type: "monthly" | "annual"
  features: string[]
}

// This is the source of truth for all subscription products
export const PRODUCTS: Product[] = [
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    description: "Professional BESS data access with monthly billing",
    priceInCents: 6, // Updated back to 6 centavos ($0.06 MXN) as requested
    type: "monthly",
    features: [
      "All Americas countries data",
      "Historical data access",
      "Advanced analytics",
      "Export capabilities",
      "Priority support",
    ],
  },
  {
    id: "pro-annual",
    name: "Pro Annual",
    description: "Professional BESS data access with annual billing (save 20%)",
    priceInCents: 480000, // $4,800/year
    type: "annual",
    features: [
      "All Americas countries data",
      "Historical data access",
      "Advanced analytics",
      "Export capabilities",
      "Priority support",
      "2 months free",
    ],
  },
]
