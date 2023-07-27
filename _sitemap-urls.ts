
import { stringify as qsStringify } from "qs";

export default defineEventHandler(async (event) => {
    const { strapiToken } =
        useRuntimeConfig();
    event.res.setHeader("Content-Type", "application/xml");

    const url = new URL(`/api/articles`, "https://cms.simpleanalytics.com");
    const params = {
        sort: "publishedAt:desc",
    };
    url.search = qsStringify(params, { encodeValuesOnly: true });
    const response = await $fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${strapiToken}`,
        },
    });

    console.log("--- response ----", response)

    console.log("--- response data----", response.data)
})

