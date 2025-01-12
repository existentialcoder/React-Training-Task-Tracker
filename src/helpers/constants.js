/**
 * @module constants - All app level constants
 */

export default {
    filterItems: [
        {
            label: 'All',
            value: 'all'
        },
        // {
        //   label: 'By created time',
        //   value: 'by_created_time'
        // },
        {
            label: 'By incomplete tasks',
            value: 'by_incomplete_tasks'
        }
    ],
    taskFields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            multi: false
        },
        {
            name: 'description',
            label: 'Description',
            type: 'text',
            multi: true
        },
        {
            name: 'completed',
            label: 'Mark as completed',
            type: 'radio',
            multi: false
        }
    ]
};
