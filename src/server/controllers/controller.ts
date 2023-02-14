import { Request, Response } from "express";

interface data {
  id: number;
  text: string;
  timestamp: number;
}

let id = 0;

const data: data[] = [];

const getAll = (req: Request, res: Response) => {
  res.status(200).send(data);
};

const getOneById = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = data.findIndex((item) => item.id === Number(id));
  res.status(200).send(data[index]);
};

const create = (req: Request, res: Response) => {
  const { text } = req.body;
  id = ++id;
  data.push({ id, text, timestamp: Date.now() });
  res.status(201).send(data);
};

const updateById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { text } = req.body;
  const index = data.findIndex((item) => item.id === id);
  const timestamp = data[index].timestamp;
  data[index] = { id, text, timestamp };
  res.send({ message: "Updated successfully" });
};

const deleteById = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = data.findIndex((item) => item.id === Number(id));
  data.splice(index, 1);

  res.send({ message: "Deleted successfully" });
};

export { getAll, getOneById, create, updateById, deleteById };
