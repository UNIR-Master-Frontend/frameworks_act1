import { render, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import MagazinesList from "./MagazinesList";
import * as service from "../../services/magazine.service";


// Mock de servicios
vi.mock("../../services/magazine.service");

// Mock directo del hook (SIN IMPORT)
vi.mock("../../../../../hooks/useLoading", () => ({
  default: () => ({
    setLoading: vi.fn(),
  }),
}));

// Mock del componente hijo
vi.mock("../Magazine/Magazine", () => ({
  default: () => <div data-testid="mock-magazine" />,
}));

describe("MagazinesList", () => {
  const mockMagazines = [
    { id: 1, nombre: "Tech Today" },
    { id: 2, nombre: "Fashion Weekly" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (service.getMagazines as any).mockResolvedValue(mockMagazines);
    (service.getMagazinesByCategory as any).mockResolvedValue(mockMagazines);
  });

  test("llama getMagazines cuando no hay categoría", async () => {
    render(<MagazinesList category="" />);

    await waitFor(() => {
      expect(service.getMagazines).toHaveBeenCalled();
    });
  });

  test("llama getMagazinesByCategory cuando hay categoría", async () => {
    render(<MagazinesList category="tech" />);

    await waitFor(() => {
      expect(service.getMagazinesByCategory).toHaveBeenCalledWith("tech");
    });
  });
});