import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus } from 'lucide-react';
import { Category } from '@/types';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onDeleteCategory: (categoryId: string) => void;
  onClose: () => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  onAddCategory,
  onDeleteCategory,
  onClose
}) => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    monthlyLimit: '',
    color: '#3B82F6'
  });

  const predefinedColors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.monthlyLimit) return;
    
    onAddCategory({
      name: newCategory.name,
      monthlyLimit: parseFloat(newCategory.monthlyLimit),
      color: newCategory.color
    });
    
    setNewCategory({ name: '', monthlyLimit: '', color: '#3B82F6' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription className="text-purple-100">
            Set up your spending categories and monthly limits
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="e.g., Food, Transport"
                  required
                />
              </div>
              <div>
                <Label htmlFor="monthlyLimit">Monthly Limit ($)</Label>
                <Input
                  id="monthlyLimit"
                  type="number"
                  step="0.01"
                  min="0"
                  value={newCategory.monthlyLimit}
                  onChange={(e) => setNewCategory({...newCategory, monthlyLimit: e.target.value})}
                  placeholder="500.00"
                  required
                />
              </div>
              <div>
                <Label>Color</Label>
                <div className="flex gap-1 mt-1">
                  {predefinedColors.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded-full border-2 ${newCategory.color === color ? 'border-gray-800' : 'border-gray-300'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewCategory({...newCategory, color})}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </form>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Current Categories</h3>
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No categories created yet</p>
            ) : (
              categories.map(category => (
                <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-600">${category.monthlyLimit.toLocaleString()} monthly limit</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-end pt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryManager;