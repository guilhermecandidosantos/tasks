import axios from "axios";

interface IGitHubDTO {
  gitHubId: number;
  username: string;
  avatarUrl: string;
}

export async function gitHubOAuth(code: string): Promise<IGitHubDTO> {
  const accessTokenResponse = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    },
  );

  const { access_token } = accessTokenResponse.data;

  const gitHubUserInfos = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { id: gitHubId, login: username, avatar_url: avatarUrl } = gitHubUserInfos.data;

  return { gitHubId, username, avatarUrl };
}
