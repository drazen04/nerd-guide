import {muscleGroups, tutorials} from './tutorials.js'

const listTutorial = document.querySelector('#tutorial ul');
const searchInput = document.getElementById('searchInput');
const muscleCheckboxesList = document.getElementById('muscle-groups-checkbox');

populateMuscleGroups(muscleCheckboxesList, Object.values(muscleGroups));
populateTutorials(listTutorial, tutorials);

const muscleGroupCheckboxes = document.querySelectorAll('input[name="muscle"]');
handleSearch({
    searchInput,
    muscleGroupCheckboxes,
    completeList: listTutorial
});
handleCheckboxes({
    searchInput,
    muscleGroupCheckboxes,
    completeList: listTutorial
});

/******************************************************************************************/
//                                       Functions
/******************************************************************************************/

function populateTutorials(list, tutorials) {
    emptyList(list)
    tutorials.forEach(tutorial => {
        const newTutorial = toList(tutorial)
        list.appendChild(newTutorial)
    })
}

function populateMuscleGroups(muscleCheckboxesList, muscleGroups) {
    muscleGroups.forEach(muscleGroup => {
        const newCheckbox = toInputCheckbox(muscleGroup)
        muscleCheckboxesList.appendChild(newCheckbox)
    })
    handleShowMuscleGroup();
}

function filterByMuscleTypeAndSearch({searchInput, muscleGroupCheckboxes, completeList}) {
    const searchFilter = searchInput.value.toLowerCase();
    const muscleGroupFilter = Array.from(muscleGroupCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const filteredTutorials = tutorials.filter(tutorial => {
        const matchesSearch = tutorial.name.toLowerCase().includes(searchFilter);
        const matchesMuscleGroup = muscleGroupFilter.length === 0 || tutorial.type.some(type => muscleGroupFilter.includes(type));
        return matchesSearch && matchesMuscleGroup;
    });

    populateTutorials(completeList, filteredTutorials);
}

function toList({name, type, video_url}) {
    const newTutorial = document.createElement('li')
    const link = document.createElement('a')
    link.href = video_url
    link.target = "_blank"
    link.textContent = name

    newTutorial.appendChild(link)

    return newTutorial
}

function toInputCheckbox(muscleGroup) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'muscle';
    checkbox.value = muscleGroup;

    const label = document.createElement('label');
    label.textContent = muscleGroup;
    label.insertBefore(checkbox, label.firstChild);

    return label;
}

function handleShowMuscleGroup() {
    document.querySelector('.expand-button').addEventListener('click', function () {
        const container = document.querySelector('.muscle-groups-container');
        container.style.display = container.style.display === 'none' ? 'grid' : 'none';
    });
}

function handleSearch({searchInput, muscleGroupCheckboxes, completeList}) {
    searchInput.addEventListener('keyup', () => filterByMuscleTypeAndSearch({
        searchInput,
        muscleGroupCheckboxes,
        completeList
    }));
}

function handleCheckboxes({searchInput, muscleGroupCheckboxes, completeList}) {
    muscleGroupCheckboxes.forEach(checkbox =>
        checkbox.addEventListener('change', () => filterByMuscleTypeAndSearch({
            searchInput,
            muscleGroupCheckboxes,
            completeList
        }))
    );
}


function emptyList(list) {
    list.innerHTML = ''
}
