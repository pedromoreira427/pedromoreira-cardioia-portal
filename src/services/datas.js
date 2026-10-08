// data de hoje no fuso do computador (toISOString usaria UTC e erraria o dia à noite)
export function hojeLocal() {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export const formatarData = (iso) => iso.split("-").reverse().join("/");
