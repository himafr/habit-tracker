// Read specific columns

import { supabase } from "@/lib/supabase";
import { HabitCompletions, HabitType } from "../types/database.type";

// let { data: habits, error } = await supabase
//   .from('habits')
//   .select('some_column,other_column')

// Read referenced tables

// let { data: habits, error } = await supabase
//   .from('habits')
//   .select(`
//     some_column,
//     other_table (
//       foreign_key
//     )
//   `)

// With pagination

// let { data: habits, error } = await supabase
//   .from('habits')
//   .select('*')
//   .range(0, 9)

// Filtering
// Documentation

// Supabase provides a wide range of filters

// With filtering

// let { data: habits, error } = await supabase
//   .from('habits')
//   .select("*")

//   // Filters
//   .eq('column', 'Equal to')
//   .gt('column', 'Greater than')
//   .lt('column', 'Less than')
//   .gte('column', 'Greater than or equal to')
//   .lte('column', 'Less than or equal to')
//   .like('column', '%CaseSensitive%')
//   .ilike('column', '%CaseInsensitive%')
//   .is('column', null)
//   .in('column', ['Array', 'Values'])
//   .neq('column', 'Not equal to')

//   // Arrays
//   .contains('array_column', ['array', 'contains'])
//   .containedBy('array_column', ['contained', 'by'])

//   // Logical operators
//   .not('column', 'like', 'Negate filter')
//   .or('some_column.eq.Some value, other_column.eq.Other value')

export async function getMyHabits({
  id,
}: {
  id: string;
}): Promise<HabitType[]> {
  let { data: habits, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  if (!habits) throw new Error("No Data");
  return habits;
}
// Insert rows

export async function createHabit({
  title,
  description,
  frequency,
  user_id,
}: {
  title: string;
  description: string;
  frequency: string;
  user_id: string;
}) {
  const { data, error } = await supabase
    .from("habits")
    .insert([{ title, description, frequency, user_id }])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function getHabit({ id }: { id: string }): Promise<HabitType> {
  let { data: habits, error } = await supabase
    .from("habits")
    .select()
    .eq("id", id);
  if (error) throw new Error(error.message);

  console.log(habits);
  return habits?.[0];
}
// Insert many rows

// const { data, error } = await supabase
//   .from('habits')
//   .insert([
//     { some_column: 'someValue' },
//     { some_column: 'otherValue' },
//   ])
//   .select()

// Upsert matching rows
// export async function getMyHabits({id}:{id:string}){

//   const { data, error } = await supabase
//     .from('habits')
//     .upsert({ user_id: id })
//     .select();
//     if (error) throw new Error(error.message);

//     return data;
// }

// Update matching rows
export async function updateHabit({
  id,
  last_completed,
}: Pick<HabitType, "id" | "last_completed">) {
  const habit = await getHabit({ id });

  if (!habit) throw new Error("Habit not found");

  const { data, error } = await supabase
    .from("habits")
    .update({ last_completed, streak_count: habit.streak_count + 1 })
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}
// Delete rows
// Documentation

// delete lets you delete rows. delete will match all rows by default, so remember to specify your filters!

// Delete matching rows
export async function deleteHabit({ id }: { id: string }) {
  const { error } = await supabase.from("habits").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function completeHabit(
  completeHabit: Pick<HabitCompletions, "habit_id" | "user_id">,
): Promise<HabitCompletions> {
  const { data, error } = await supabase
    .from("habit_completions")
    .insert([completeHabit])
    .select();
  if (error) throw new Error(error.message);
  console.log(data);
  return data?.[0];
}
