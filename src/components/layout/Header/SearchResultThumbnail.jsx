import React from 'react'

const SearchResultThumbnail = ({src}) => {
  return (
    <img
    className="h-[42px] w-[55px] rounded-md"
    src={src}
    alt="artist"
  />
  )
}

export default SearchResultThumbnail