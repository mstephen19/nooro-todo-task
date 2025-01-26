// For generic & composable API methods
export const fetchClient =
    ({ baseUrl }: { baseUrl?: string }) =>
    <Body = never, Params extends Record<string, { toString: () => string }> = Record<string, string>, Response = never>(
        method: string,
        path: string
    ) =>
    async ({ body, params }: { body?: Body; params?: Params } = {}) => {
        const url = new URL(path, baseUrl);

        if (params) {
            for (const name in params) {
                url.searchParams.set(name, params[name].toString());
            }
        }

        const res = await fetch(url, {
            method,
            body: body && JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.status.toString().startsWith('2')) {
            console.log(await res.text());
            throw new Error('Request failed with non-200 status code.');
        }

        return res.json() as Response;
    };
