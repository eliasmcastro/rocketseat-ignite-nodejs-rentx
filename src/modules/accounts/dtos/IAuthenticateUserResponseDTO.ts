interface IAuthenticateUserResponseDTO {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

export { IAuthenticateUserResponseDTO };
