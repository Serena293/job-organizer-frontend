export function useInputClasses() {
  const base = 'border rounded px-2 py-1 w-full placeholder-gray-400 focus:outline-none focus:ring-2'

  const normal = `${base} border-gray-300 focus:ring-blue-500`
  const error = `${base} border-red-500 focus:ring-red-400`
  const valid = `${base} border-green-500 focus:ring-green-400`

  return { normal, error, valid }
}
