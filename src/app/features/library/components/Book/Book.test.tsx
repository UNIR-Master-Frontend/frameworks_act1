import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Book from "./Book";


const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => mockNavigate };
});


vi.mock("../../../../assets/images/jpg/book.jpg", () => ({
  default: "book.jpg",
}));


const mockBook = {
  id: 1,
  nombre: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  categoria: "ficción",
  precio: 19.99,
  anio_publicacion: 1967,
  cantidad_disponible: 10,
  editorial: "Sudamericana",
};

describe("Book", () => {
  test("se ve el nombre y el autor del libro", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByText("Cien años de soledad")).toBeInTheDocument();
    expect(screen.getByText("Gabriel García Márquez")).toBeInTheDocument();
  });

  test("se muestra el precio", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByText(/19.99/)).toBeInTheDocument();
  });

  test("aparece la imagen del libro", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Imagen de libro")).toBeInTheDocument();
  });

  test("al hacer clic en el libro te lleva al detalle", () => {
    render(
      <MemoryRouter>
        <Book book={mockBook} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Cien años de soledad"));

    
    expect(mockNavigate).toHaveBeenCalledWith("/library/books/1");
  });
});