'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CirclePlusIcon, TrashIcon } from 'lucide-react';

export default function ProductStock({ register }) {
  const [variants, setVariants] = useState([
    { id: 1, sku: 'WHAT', stock: 1, price: 1, size: 'S' },
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { id: variants.length + 1, sku: '', stock: 0, price: 0, size: 'M' },
    ]);
  };

  const removeVariant = (id: number) => {
    setVariants(variants.filter((variant) => variant.id !== id));
  };

  const handleSizeChange = (id, value) => {
    setVariants(
      variants.map((variant) =>
        variant.id === id ? { ...variant, size: value } : variant
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px]">Size</TableHead>
              <TableHead className="w-[50px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant, index) => (
              <TableRow key={variant.id}>
                <TableCell className="font-semibold">
                  <Label htmlFor={`sku-${variant.id}`} className="sr-only">
                    SKU
                  </Label>
                  <Input
                    id={`sku-${variant.id}`}
                    defaultValue={variant.sku}
                    {...register(`variants.${index}.sku`)}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor={`stock-${variant.id}`} className="sr-only">
                    Stock
                  </Label>
                  <Input
                    id={`stock-${variant.id}`}
                    type="number"
                    defaultValue={variant.stock}
                    {...register(`variants.${index}.stock`)}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor={`price-${variant.id}`} className="sr-only">
                    Price
                  </Label>
                  <Input
                    id={`price-${variant.id}`}
                    type="number"
                    defaultValue={variant.price}
                    {...register(`variants.${index}.price`)}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor={`size-${variant.id}`} className="sr-only">
                    Size
                  </Label>
                  <select
                    className="px-4 py-2 border rounded-md"
                    name=""
                    id=""
                    defaultValue={variant.size}
                    {...register(`variants.${index}.size`)}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeVariant(variant.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={addVariant}
          type="button"
        >
          <CirclePlusIcon className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
}
