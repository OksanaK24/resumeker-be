const db = require("../../database/config/dbConfig");

const drafts = db("drafts");
const roles = db("roles");
const skills = db("skills");
const education = db("education");
const hobbiesTable = db("hobbies");
const workTable = db("work");
const projects = db("projects");

module.exports = {
    Draft: {
        role: async ({ id, userID }, _, { decoded, throwAuthError }) => {
            if (userID !== decoded.sub) {
                throwAuthError();
            }
            const [result] = await roles.where({ draftID: id });
            return result;
        },
        project: async ({ id, user }, _, { decoded, throwAuthError }) => {
            if (user !== decoded.sub) {
                throwAuthError();
            }
            return projects.where({ draftID: id });
        },
        work: ({ id, user }, _, { decoded, throwAuthError }) => {
            if (user !== decoded.sub) {
                throwAuthError();
            }
            return workTable.where({ draftID: id });
        },
        education: ({ id, user }, _, { decoded, throwAuthError }) => {
            if (user !== decoded.sub) {
                throwAuthError();
            }
            return education.where({ draftID: id });
        },
        skill: ({ id, user }, _, { decoded, throwAuthError }) => {
            if (user !== decoded.sub) {
                throwAuthError();
            }
            return skills.where({ draftID: id });
        },
        hobbies: ({ id, user }, _, { decoded, throwAuthError }) => {
            if (user !== decoded.sub) {
                throwAuthError();
            }
            return hobbiesTable.where({ draftID: id });
        },
    },
    Query: {
        helloWorld: async (parent, _, { decoded }) => {
            console.log(decoded);
            return "Hello World";
        },
        getDraft: async (_, { draftID }, { decoded }) => {
            const [draft] = await drafts.where({ id: draftID });
            if (decoded.sub === draft.userID) {
                return draft;
            }
            throw Error("This draft does not belong to the user.");
        },
        getDrafts: (_, __, { decoded }) =>
            drafts.where({ user_id: decoded.sub }),
    },
    Mutation: {
        addDraft: async (_, { email, name }, { decoded }) => {
            const [result] = await drafts.insert(
                { email, name, userID: decoded.sub },
                ["id"]
            );
            return result.id;
        },
        updateDraft: () => {
            return { error: "Work in progress" };
        },
        deleteDraft: () => {
            return { error: "work in progress" };
        },
    },
};
