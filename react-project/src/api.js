export async function fetchSearchResult(title) {
  const unit8array = await fetch(`/v1/search/book.json?query=${title}`, {
    method: "GET",
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECRET,
    },
  })
    .then((res) => res.body.getReader().read())
    .then(({ _, value }) => value);
  const { total, items } = JSON.parse(new TextDecoder().decode(unit8array));
  return { total, items };
}
