// Globals
const list = document.querySelector('.list');
const root = document.querySelector(':root');

// This function is used to get colors for the list elements
const colors = getAllColors(root);
function getAllColors(root) {
    let rootStyleObject = getComputedStyle(root);
    let colors = [];// for storing the colors
    let lightRed = rootStyleObject.getPropertyValue("--light-red");
    let orangeyYellow = rootStyleObject.getPropertyValue("--orangey-yellow");
    let greenTeal = rootStyleObject.getPropertyValue("--green-teal");
    let cobaltBlue = rootStyleObject.getPropertyValue("--cobalt-blue");
    colors.push(lightRed, orangeyYellow, greenTeal, cobaltBlue);
    return colors;
}


// An IIFE function expression to create dynamic DOM 
(() => {
    // Now we would generate a list with list-items in it 
    // with the structure described in html
    // also we would use the json file array of objects to populate the data
    for (let i = 0; i < 4; i++) {
        let listItem = document.createElement('li');
        
        // give each list item unique id 
        listItem.setAttribute('id', `${i}`);
        listItem.style.backgroundColor = `hsl(${colors[i]},0.1)`;
        listItem.classList.add('container','list-item');
        // creaate two containers for each list item
        let descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description-container','container');
        
        let scoreContainer = document.createElement('div');
        scoreContainer.classList.add('score-container','container', 'small-text');
        
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
        const listItemScoreNumerator = document.createElement('span');
        listItemScoreNumerator.classList.add('numerator');
        listItemScoreNumerator.style.color="var(--gray-blue)";

        const listItemScoreDenominator = document.createElement('span');
        listItemScoreDenominator.textContent = "/100";
        listItemScoreDenominator.style.color = "var(--pale-blue)";
        
        // append the list items to the associated containers
        // todo: Make a general func for multiple appends to a specific element 
        descriptionContainer.appendChild(listIcon)
        descriptionContainer.appendChild(listItemTitle);
        scoreContainer.appendChild(listItemScoreNumerator);
        scoreContainer.appendChild(listItemScoreDenominator)
        
        
        list.appendChild(listItem);
    }
    
    // Fetching data from data.json and then representing it in html
    fetch('./data.json')
            .then(response => response.json())
            .then((data) => {
                // populate the listItems fetched from the local json into the list  
                populateList(data);
            }).catch(error => console.log(error));
    
})();

// function to populate the list of items 
function populateList(listItems) {
    // grabs the list children nodes
    const listNodes = list.children;
    
    for (let i = 0; i < listNodes.length;i++) {
        const containers = listNodes[i].children;
        const descriptionChildren = containers[0].children;
        const icon = descriptionChildren[0];
        icon.setAttribute('src', `${listItems[i].icon}`)
        icon.setAttribute('alt',`${listItems[i].category}`)
        const category = descriptionChildren[1];
        category.textContent = `${listItems[i].category}`;
        category.style.color = `hsl(${colors[i]})`;    
        const scoreContainerChildren = containers[1].children;
        const numerator = scoreContainerChildren[0];
        numerator.textContent = `${listItems[i].score}`;

    }
    
}