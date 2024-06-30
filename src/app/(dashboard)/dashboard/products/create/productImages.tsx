import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

export default function ProductImages({
  register,
  selectedImages,
  selectedImage,
  handleImagesChange,
  handleImageChange,
  removeImage,
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Lipsum dolor sit amet, consectetur adipiscing elit
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          type="file"
          accept="image/png, image/jpeg"
          {...register('image')}
          onChange={handleImageChange}
        />
        {selectedImage.length > 0 && (
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={URL.createObjectURL(selectedImage[0])}
            width="300"
          />
        )}

        <div className="grid gap-2 mt-4">
          <Input
            type="file"
            multiple
            accept="image/png, image/jpeg"
            {...register('images')}
            onChange={handleImagesChange}
            className="hidden"
            id="product-images"
          />

          <div className="grid grid-cols-3 gap-2">
            {selectedImages.length === 0
              ? ''
              : selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Selected image ${index + 1}`}
                      className="aspect-square w-full rounded-md object-cover"
                      width="300"
                      height="300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
            <label
              htmlFor="product-images"
              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Upload</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
