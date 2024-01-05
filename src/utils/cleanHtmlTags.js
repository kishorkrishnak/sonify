export default function cleanHtmlTags(htmlString) {
    // Replace HTML tags with an empty string
    return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
  }