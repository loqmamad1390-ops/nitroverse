// NitroVerse API Client
// ============================================
// 🔥 برای اجرا روی هاست، API_BASE رو خالی بذار
// ============================================
const API_BASE = "";  // ← خالی = همون دامنه (مثلاً https://nitroverse.onrender.com)

class NitroAPI {
    constructor() {
        this.token = localStorage.getItem("nv_token");
    }

    async request(endpoint, options = {}) {
        const url = `${API_BASE}${endpoint}`;
        const headers = {
            "Content-Type": "application/json",
            ...options.headers
        };
        
        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: "include"
        });

        if (response.status === 401) {
            // تلاش برای refresh token
            const refreshed = await this.refreshToken();
            if (refreshed) {
                return this.request(endpoint, options);
            }
        }

        return response;
    }

    async refreshToken() {
        try {
            const response = await fetch(`${API_BASE}/auth/refresh`, {
                method: "POST",
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                this.token = data.accessToken;
                localStorage.setItem("nv_token", this.token);
                return true;
            }
        } catch (e) {
            console.error("Refresh failed:", e);
        }
        return false;
    }

    // ========== Auth ==========
    async register(data) {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async login(data) {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        });
        const result = await response.json();
        if (response.ok) {
            this.token = result.accessToken;
            localStorage.setItem("nv_token", this.token);
            localStorage.setItem("nv_user", JSON.stringify(result.user));
        }
        return result;
    }

    async logout() {
        await fetch(`${API_BASE}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
        this.token = null;
        localStorage.removeItem("nv_token");
        localStorage.removeItem("nv_user");
    }

    async getMe() {
        const response = await this.request("/auth/me");
        return response.json();
    }

    // ========== Profile ==========
    async getProfile() {
        const response = await this.request("/api/profile");
        return response.json();
    }

    async updateProfile(data) {
        const response = await this.request("/api/profile", {
            method: "PUT",
            body: JSON.stringify(data)
        });
        return response.json();
    }

    // ========== Quiz ==========
    async getHistory(limit = 50) {
        const response = await this.request(`/api/quiz/history?limit=${limit}`);
        return response.json();
    }

    async saveQuizResult(data) {
        const response = await this.request("/api/quiz/save", {
            method: "POST",
            body: JSON.stringify(data)
        });
        return response.json();
    }

    // ========== Leaderboard ==========
    async getLeaderboard(province = null, limit = 50) {
        let url = `/api/leaderboard?limit=${limit}`;
        if (province) url += `&province=${province}`;
        const response = await this.request(url);
        return response.json();
    }

    async getMyRank() {
        const response = await this.request("/api/leaderboard/me");
        return response.json();
    }

    // ========== Shop ==========
    async getShopItems(category = "all") {
        const response = await this.request(`/api/shop/items?category=${category}`);
        return response.json();
    }

    async getBalance() {
        const response = await this.request("/api/shop/balance");
        return response.json();
    }

    async buyItem(itemId) {
        const response = await this.request("/api/shop/buy", {
            method: "POST",
            body: JSON.stringify({ item_id: itemId })
        });
        return response.json();
    }

    async getInventory() {
        const response = await this.request("/api/shop/inventory");
        return response.json();
    }

    // ========== Rank ==========
    async getMyRankInfo() {
        const response = await this.request("/api/rank");
        return response.json();
    }

    async getAllRanks() {
        const response = await this.request("/api/rank/all");
        return response.json();
    }

    // ========== Achievements ==========
    async getAchievements() {
        const response = await this.request("/api/achievements");
        return response.json();
    }

    async getUnlockedAchievements() {
        const response = await this.request("/api/achievements/unlocked");
        return response.json();
    }

    // ========== Groups ==========
    async getGroups(page = 1) {
        const response = await this.request(`/api/groups?page=${page}`);
        return response.json();
    }

    async getGroup(groupId) {
        const response = await this.request(`/api/groups/${groupId}`);
        return response.json();
    }

    async createGroup(data) {
        const response = await this.request("/api/groups/create", {
            method: "POST",
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async joinGroup(groupId) {
        const response = await this.request(`/api/groups/${groupId}/join`, {
            method: "POST"
        });
        return response.json();
    }

    async leaveGroup(groupId) {
        const response = await this.request(`/api/groups/${groupId}/leave`, {
            method: "POST"
        });
        return response.json();
    }

    async getMyGroups() {
        const response = await this.request("/api/groups/my-groups");
        return response.json();
    }

    // ========== Leagues ==========
    async getLeagues() {
        const response = await this.request("/api/leagues");
        return response.json();
    }

    async getMyLeague() {
        const response = await this.request("/api/leagues/my-league");
        return response.json();
    }
}

// Export singleton
window.NitroAPI = new NitroAPI();