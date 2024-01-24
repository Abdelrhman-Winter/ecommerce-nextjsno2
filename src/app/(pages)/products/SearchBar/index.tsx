'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('')
  const { searchterm, setSearchterm } = useFilter()

  const handleSearch = () => {
    const searchTerm = inputValue.trim()
    if (searchTerm.length > 2 || searchTerm.length === 0) {
      setSearchterm(searchTerm)
      setInputValue('')
      console.log('searchterm', searchterm)
    } else {
      console.log('Search term should be at least 3 characters long.')
    }
  }

  useEffect(() => {
    return () => {
      // This cleanup function runs on component unmount
      setSearchterm('') // Reset search term when the component is unmounted
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array ensures it runs only on unmount

  return (
    <div className={classes.search__container}>
      <p className="search__title">Note:Search term should be at least 3 characters long</p>
      <div className={classes.search__inputSearch}>
        <input
          className={classes.search__input}
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={handleSearch} className={classes.search__button}>
          <Image src="/assets/icons/search.png" alt="hand" width={30} height={30} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
