export interface Resolver {
  (puzzle: string): Promise<string>
}