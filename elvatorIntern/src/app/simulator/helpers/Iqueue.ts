export interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T;
  size(): number;
}