interface AmountProp {
  amount: number
}

export const assertZeroAmount = <O extends AmountProp>(obj: O | undefined): number => obj?.amount ?? 0;
