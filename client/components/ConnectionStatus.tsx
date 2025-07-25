"use client";
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

export function ConnectionStatus() {
  // Always show demo mode in this environment
  return (
    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
      Demo Mode
    </Badge>
  );
}
