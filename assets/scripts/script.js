const app = Vue.createApp({
    data() {
        return {
            input: {
                title: null,
                description: null,
            },
            notes: [],
            searchInput: null,
        };
    },
    mounted() {
        const local = JSON.parse(localStorage.getItem("notes"));

        // if local is not empty it will change this.notes to the data in localstorage
        if (local) this.notes = local;
        else this.notes = [];
    },
    watch: {
        // for array of objects require deep watch
        notes: {
            handler() {
                this.updateLocal();
            },
            deep: true,
        },
    },
    computed: {
        // make a new note list to show the result of the search
        noteList() {
            let list = this.notes;

            if (this.searchInput != "" && this.searchInput) {
                list = list.filter((item) => {
                    return item.title
                        .toLowerCase()
                        .includes(this.searchInput.toLowerCase());
                });
            }

            // if theres nothing to search
            return list;
        },
    },
    methods: {
        addNote() {
            this.notes.push(this.input);
            // reset input text to null after it got added into the notes
            this.input = {
                title: null,
                description: null,
            };
        },
        // delete note based on index number
        deleteNote(id) {
            this.notes.splice(id, 1);
        },
        // put this on watch so it will call the function on every changes made in this.notes
        updateLocal() {
            localStorage.setItem("notes", JSON.stringify(this.notes));
        },
    },
});

app.mount("#app");
