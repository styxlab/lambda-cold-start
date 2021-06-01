const QueryError = {
  UniqueConstraintViolation: 'P2002',
} as const

interface UniqueConstraintViolation {
  code: 'P2002'
  meta: {
    target: string[]
  }
}

export function isUniqueConstraintViolation(error: { code: string }): error is UniqueConstraintViolation {
  return error.code === QueryError.UniqueConstraintViolation
}
