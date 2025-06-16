export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;

  if (!password) return { score, label: "Too Short", color: "bg-gray-200" };
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-[#B40000]" };
  if (score === 2) return { score, label: "Fair", color: "bg-[#F8A05C]" };
  if (score === 3) return { score, label: "Good", color: "bg-blue-700" };
  return { score, label: "Strong", color: "bg-[#34A853]" };
}
