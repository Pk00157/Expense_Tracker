export function createExpense({ description, amount, category, confidence }) {

  if (!description || typeof description !== "string") {
    throw new Error("Invalid description");
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    throw new Error("Invalid amount");
  }

  return {
    id: crypto.randomUUID(),

    description: description.trim(),

    amount: Number(amount),

    category: category || "Uncategorized",

    confidence: confidence ?? 0,

    date: new Date().toISOString()
  };
}