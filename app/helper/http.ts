import axios from "axios";
import cryto from "crypto";
import invariant from "tiny-invariant";

const instance = axios.create({
    baseURL: 'https://api.podcastindex.org/api/1.0'
});

instance.interceptors.request.use(function (config) {
    invariant( process.env.AUTH_KEY, "Auth key must be provided")
    invariant( process.env.AUTH_SECRET, "Auth Secret must be provided")

    const epoachTime= Math.floor(Date.now() / 1000)
    const key = process.env.AUTH_KEY + process.env.AUTH_SECRET +  epoachTime
    const auth = cryto.createHash("sha1").update(key).digest("hex")

    config.headers.set("X-Auth-Key", process.env.AUTH_KEY);
    config.headers.set("X-Auth-Date", epoachTime);
    config.headers.set("Authorization", auth);

    return config;
  }, function (error) {
    return Promise.reject(error);
});

export default instance;