export default function cleanHtmlTags(htmlString) {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
}
