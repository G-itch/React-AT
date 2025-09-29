class FetchData {
  static baseURL = 'https://jsonplaceholder.typicode.com';

  static async getUsers() {
    try {
      const response = await fetch(`${this.baseURL}/users`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar usuários: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
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
      console.error('Erro ao buscar posts:', error);
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
      console.error('Erro ao buscar comentários:', error);
      throw error;
    }
  }
}

export default FetchData;
