import { Request, Response } from "express";

interface data {
  id: number;
  text: string;
  timestamp: number;
}

const data: data[] = [];

const getAll = (req: Request, res: Response) => {
  res.status(200).send(data);
};

const create = (req: Request, res: Response) => {
  const { id, text, timestamp } = req.body;
  data.push({ id, text, timestamp });
  res.status(201).send(data);
};

const updateById = (req: Request, res: Response) => {
  const { id, text, timestamp } = req.body;
  const index = data.findIndex((item) => item.id === id);
  data[index] = { id, text, timestamp };
  res.send(data);
};

const deleteById = (req: Request, res: Response) => {
  const { id, text, timestamp } = req.body;
  const index = data.findIndex((item) => item.id === id);
  data[index] = { id, text, timestamp };
  res.send(data);
};

export { getAll, create, updateById, deleteById };
