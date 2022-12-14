/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {
      id: 1,
      lists_id: 1,
      name: 'Boiling Water',
      description: 'Boil the water',
      deadline: '2022-10-13T18:15:00.000Z',
      status: 'incomplete',
    },
    {
      id: 2,
      lists_id: 1,
      name: 'Chop the carrot',
      description: 'Chopping the carrot up into small pieces',
      deadline: '2022-10-13T18:15:00.000Z',
      status: 'incomplete',
    },
    {
      id: 3,
      lists_id: 2,
      name: 'Apple',
      description: 'Buy apples',
      deadline: '2022-10-13T18:15:00.000Z',
      status: 'incomplete',
    },
    {
      id: 4,
      lists_id: 2,
      name: 'Oranges',
      description: 'Buy oranges',
      deadline: '2023-10-13T18:15:00.000Z',
      status: 'incomplete',
    },
    {
      id: 5,
      lists_id: 3,
      name: 'Bicepts',
      description: '3 sets of 5',
      deadline: '2023-10-13T18:15:00.000Z',
      status: 'incomplete',
    },
    {
      id: 6,
      lists_id: 3,
      name: 'Tricepts',
      description: '4 sets of 8',
      deadline: '2023-10-13T18:15:00.000Z',
      status: 'incomplete',
    },
    {
      id: 7,
      lists_id: 3,
      name: 'Deltoids',
      description: '2 sets of 10',
      deadline: '2023-10-13T18:15:00.000Z',
      status: 'incomplete',
    },
  ])
}
