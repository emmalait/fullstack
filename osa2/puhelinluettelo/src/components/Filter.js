import React from 'react'

const Filter = ({newSearch, handlePersonsToShowChange}) => {
    return (
        <form>
        <div>
          rajaa näytettäviä: <input value={newSearch} onChange={handlePersonsToShowChange} />
        </div>
      </form>
    )
}

export default Filter;