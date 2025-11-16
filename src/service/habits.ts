// Read specific columns

import { supabase } from "@/lib/supabase";
import { Habits } from "../types/database.type";

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

export async function getMyHabits({id}:{id:string}):Promise<Habits[]>{
  
  let { data: habits , error } = await supabase
    .from('habits')
    .select("*").eq('user_id', id).order('created_at',{ascending:false});
    if (error) throw new Error(error.message);
    if (!habits) throw new Error("No Data");
    return habits;
}
// Insert rows

export async function createHabit({
  title,
  description,
  frequency,
  user_id
}: {
  title: string;
  description: string;
  frequency: string;
  user_id: string;
}) {
  const { data, error } = await supabase
    .from("habits")
    .insert([{ title, description, frequency, user_id}])
    .select();
    if (error) throw new Error(error.message);
    return data;
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

// Update rows
// Documentation

// update lets you update rows. update will match all rows by default. You can update specific rows using horizontal filters, e.g. eq, lt, and is.

// update will also return the replaced values for UPDATE.

// Update matching rows

// const { data, error } = await supabase
//   .from('habits')
//   .update({ other_column: 'otherValue' })
//   .eq('some_column', 'someValue')
//   .select()

// Delete rows
// Documentation

// delete lets you delete rows. delete will match all rows by default, so remember to specify your filters!

// Delete matching rows
export async function deleteHabit({id}:{id:string}){

  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', id)
    if (error) throw new Error(error.message);
}
