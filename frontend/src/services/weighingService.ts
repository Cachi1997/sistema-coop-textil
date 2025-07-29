export async function submitWeighing(data: {
  grossWeight: number;
  internalTare: number;
  externalTare: number;
  netWeight: number;
}) {
  // await fetch(`${import.meta.env.VITE_API_URL}/weighings`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
}
