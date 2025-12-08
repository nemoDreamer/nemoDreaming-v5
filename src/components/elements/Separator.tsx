export default function Separator({ char = "|" }: { char?: string }) {
  return <span className="text-gray-300">{char}</span>;
}
