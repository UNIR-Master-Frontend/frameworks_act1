import { LIBRARY_API_BASE_URL } from "@/constants/url";

const DEFAULT_USER_ID = 1;

export const getPurchaseUserId = (user) => {
  const userId = Number(user?.id);
  return Number.isInteger(userId) ? userId : DEFAULT_USER_ID;
};

export const createPurchase = async ({ product, quantity = 1, user }) => {
  const response = await fetch(`${LIBRARY_API_BASE_URL}/compras`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario_id: getPurchaseUserId(user),
      detalles: [
        {
          producto_id: product.id,
          cantidad: quantity,
          subtotal: Number(product.precio) * quantity,
        },
      ],
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.error || "Error al crear la compra");
  }

  return payload?.data ?? payload;
};
