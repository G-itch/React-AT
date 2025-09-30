class FetchData {
  static baseURL = "https://jsonplaceholder.typicode.com";

  static async getUsers() {
    try {
      const response = await fetch(`${this.baseURL}/users`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuários: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const retryResponse = await fetch(`${this.baseURL}/users`);
          if (!retryResponse.ok) {
            throw new Error(`Erro ao buscar usuários: ${retryResponse.status}`);
          }
          return await retryResponse.json();
        } catch (retryError) {
          console.error("Erro ao buscar usuários após retry:", retryError);
          throw retryError;
        }
      }
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  }

  static async getPostsByUserId(userId) {
    try {
      const response = await fetch(`${this.baseURL}/posts/?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar posts: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
          const retryResponse = await fetch(
            `${this.baseURL}/posts/?userId=${userId}`
          );
          if (!retryResponse.ok) {
            throw new Error(`Erro ao buscar posts: ${retryResponse.status}`);
          }
          return await retryResponse.json();
        } catch (retryError) {
          console.error("Erro ao buscar posts após retry:", retryError);
          throw retryError;
        }
      }
      console.error("Erro ao buscar posts:", error);
      throw error;
    }
  }

  static async getCommentsByPostId(postId) {
    try {
      const response = await fetch(`${this.baseURL}/comments?postId=${postId}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar comentários: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
          const retryResponse = await fetch(
            `${this.baseURL}/comments?postId=${postId}`
          );
          if (!retryResponse.ok) {
            throw new Error(
              `Erro ao buscar comentários: ${retryResponse.status}`
            );
          }
          return await retryResponse.json();
        } catch (retryError) {
          console.error("Erro ao buscar comentários após retry:", retryError);
          throw retryError;
        }
      }
      console.error("Erro ao buscar comentários:", error);
      throw error;
    }
  }
}

export default FetchData;
