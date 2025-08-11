package com.musicmart.product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> findAll() {
        return repo.findAll();
    }

    public Product findById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
    }

    public Product create(Product p) {
        p.setId(null);
        return repo.save(p);
    }

    public Product update(Long id, Product p) {
        Product existing = findById(id);
        existing.setName(p.getName());
        existing.setPrice(p.getPrice());
        existing.setDescription(p.getDescription());
        existing.setImage(p.getImage());
        return repo.save(existing);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new ProductNotFoundException(id);
        repo.deleteById(id);
    }
}
