import http from "../http-common";

class DataService {
    getAll() {
        return http.get("/contact");
    }

    get(id) {
        return http.get(`/contacts/${id}`);
    }

    create(data) {
        return http.post("/contact", data);
    }

    update(id, data) {
        return http.put(`/contacts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/contacts/${id}`);
    }

}

export default new DataService();