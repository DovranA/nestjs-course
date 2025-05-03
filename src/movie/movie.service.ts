import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { MoviePosterEntity } from './entities/poster.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Movie, MoviePoster } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: { actors: true, poster: true, reviews: true },
    });
    if (!movie || !movie.isAvailable)
      throw new NotFoundException("Don't find movie");

    return movie;
  }

  async create(dto: MovieDto): Promise<Movie> {
    const { actorIds, releaseYear, title, imageUrl } = dto;

    const actors = await this.prismaService.actor.findMany({
      where: { id: { in: actorIds } },
    });
    if (!actors.length)
      throw new NotFoundException('one or some actor(s) not found');

    const movie = await this.prismaService.movie.create({
      data: {
        releaseYear,
        title,
        poster: imageUrl ? { create: { url: imageUrl } } : undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });
    return movie;
  }

  async update(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findById(id);
    const actors = await this.prismaService.actor.findMany({
      where: { id: { in: dto.actorIds } },
    });
    if (!actors.length)
      throw new NotFoundException('one or some actor(s) not found');
    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        title: dto.title,
        releaseYear: dto.releaseYear,
        poster: dto.imageUrl ? { create: { url: dto.imageUrl } } : undefined,
        actors: {
          connect: actors.map((actor) => ({
            id: actor.id,
          })),
        },
      },
    });

    return true;
  }
  async delete(id: string) {
    const movie = await this.findById(id);
    await this.prismaService.movie.delete({ where: { id: movie.id } });
    return movie.id;
  }
}
