import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface IncomeModalProps {
  currentIncome: number;
  onSave: (income: number) => void;
  onClose: () => void;
}

const IncomeModal: React.FC<IncomeModalProps> = ({ currentIncome, onSave, onClose }) => {
  const [income, setIncome] = useState(currentIncome.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const incomeValue = parseFloat(income);
    if (incomeValue >= 0) {
      onSave(incomeValue);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Set Monthly Income
          </CardTitle>
          <CardDescription className="text-green-100">
            Update your family's total monthly income
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="income">Monthly Income ($)</Label>
              <Input
                id="income"
                type="number"
                step="0.01"
                min="0"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="5000.00"
                required
                className="text-lg"
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                Save Income
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomeModal;