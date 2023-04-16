#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Tadeco.ECommerce.WebAPI/Tadeco.ECommerce.WebAPI.csproj", "Tadeco.ECommerce.WebAPI/"]
RUN dotnet restore "Tadeco.ECommerce.WebAPI/Tadeco.ECommerce.WebAPI.csproj"
COPY . .
WORKDIR "/src/Tadeco.ECommerce.WebAPI"
RUN dotnet build "Tadeco.ECommerce.WebAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Tadeco.ECommerce.WebAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Tadeco.ECommerce.WebAPI.dll"]