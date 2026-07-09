-- Create the blog-media bucket
insert into storage.buckets (id, name, public)
values ('blog-media', 'blog-media', true)
on conflict (id) do nothing;

-- Set up security policies for the blog-media bucket
-- Allow public read access to all files
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'blog-media' );

-- Allow authenticated users to upload files
create policy "Authenticated users can upload media"
  on storage.objects for insert
  with check ( bucket_id = 'blog-media' and auth.role() = 'authenticated' );

-- Allow authenticated users to update their files
create policy "Authenticated users can update media"
  on storage.objects for update
  using ( bucket_id = 'blog-media' and auth.role() = 'authenticated' );

-- Allow authenticated users to delete their files
create policy "Authenticated users can delete media"
  on storage.objects for delete
  using ( bucket_id = 'blog-media' and auth.role() = 'authenticated' );
