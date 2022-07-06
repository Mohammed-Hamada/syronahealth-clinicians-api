interface NotFoundError {
  message: 'Sorry, this page not found';
  status: 404;
}

type Status = 400 | 401 | 402 | 403 | 405 | 406 | 407 | 408 | 409 | 410 | 429;

interface AnotherErrors extends Error {
  message: string;
  status: Status;
}

export { NotFoundError, AnotherErrors, Status };
