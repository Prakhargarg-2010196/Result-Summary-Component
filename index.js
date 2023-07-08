
// An IIFE function expression to create dynamic DOM 
const list = document.querySelector('.list');
(() => {
    // now we would generate a list with list-items in it 
    // with the structure described in html
    // also we would use the json file array of objects to populate the data
    
    for (let i = 0; i < 4; i++) {
        let listItem = document.createElement('li');
        // give each list item unique id 
        listItem.setAttribute('id', `${i}`);
        // creaate two containers for each list item
        let descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('container');
        
        let scoreContainer = document.createElement('div');
        scoreContainer.classList.add('container');
        
        // Append the containers to the list Item 
        listItem.appendChild(descriptionContainer);
        listItem.appendChild(scoreContainer);

        // Desc container would hold two elements icon and the title of the stat these two would be fetched from the data.json just         icon.classList.add('list--item--icon');

        // desc container items
        const listIcon = document.createElement('img');
        listIcon.classList.add('list--item--icon');
        const listItemTitle = document.createElement('span');
        listItemTitle.classList.add('list--item--title');
        
        // score container items
        const listItemScoreElement = document.createElement('span');
        listItemScoreElement.classList.add('small-text', 'container');
        const listItemScoreNumerator = document.createElement('span');
        listItemScoreNumerator.classList.add('numerator');
        listItemScoreElement.appendChild(listItemScoreNumerator);
        
        // append the list items to the associated containers 
        // todo: Make a general func for multiple appends to a specific element 
        descriptionContainer.appendChild(listIcon)
        descriptionContainer.appendChild(listItemTitle);
        scoreContainer.appendChild(listItemScoreElement);
        
        
        list.appendChild(listItem);
    }
    
    // Fetching data from data.json and then representing it in html
    fetch('./data.json')
            .then(response => response.json())
            .then((data) => {
                // populate the listItems fetched from the local json 
                populateList(data);
            }).catch(error => console.log(error));
    
})();

// function to populate the list of items 
function populateList(listItems) {
    const listNodes = list.children;
    for (let i = 0; i < listNodes.length;i++) {
        const containers = listNodes[i].children;
        const descriptionChildren = containers[0].children;
        const icon = descriptionChildren[0];
        icon.setAttribute('href', `${listItems[i].icon}`)
        icon.setAttribute('alt',`${listItems[i].category}`)
        const category = descriptionChildren[1];
        category.textContent = `${listItems[i].category}`;
        const scoreContainer = containers[1].children;
        const numerator = scoreContainer[0];
        numerator.textContent = `${listItems[i].score}/100`;
    }
    
}