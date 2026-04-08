import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import type { Task } from "../types";

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData: Task[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        done: doc.data().done,
        createdAt: doc.data().createdAt?.toMillis?.() ?? Date.now(),
        userId: doc.data().userId,
      }));
      tasksData.sort((a, b) => b.createdAt - a.createdAt);
      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (title: string, description: string) => {
    if (!userId) return;
    await addDoc(collection(db, "tasks"), {
      title,
      description,
      done: false,
      createdAt: serverTimestamp(),
      userId,
    });
  };

  const updateTask = async (
    taskId: string,
    data: Partial<Pick<Task, "title" | "description" | "done">>
  ) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, data);
  };

  const deleteTask = async (taskId: string) => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  };

  const toggleTask = async (taskId: string, currentDone: boolean) => {
    await updateTask(taskId, { done: !currentDone });
  };

  return { tasks, loading, addTask, updateTask, deleteTask, toggleTask };
};
