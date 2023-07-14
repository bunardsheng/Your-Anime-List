export function Search({search, value, handleClick}) {
    return (
  
      <div className = "search-container">
         <input className = "search-bar" type="text" onChange={search} value={value}></input>
         <button className = "search-btn" onClick={handleClick}>Search</button>
         
      </div>
    )
  }
  
export function Sort({placeHolder, options, showItems, showSort, determineSort}) {
    function getDisplay() {
      return placeHolder;
    }
    return (
      <div className = "drop-container">
        <div className = "drop-select">
          <button onClick = {showSort} className = "drop-btn">{getDisplay()}</button>
          { showItems && (
            <div className = "drop-options">
            {options.map((option) => 
              
              <button key = {option.value} className = "drop-item" onClick = {() => determineSort(option.label)}>
                { option.label }
              </button>
            )}
            </div>
          )}
        </div>
      </div>
    )
  }